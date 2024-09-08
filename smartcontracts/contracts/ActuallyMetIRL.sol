// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract ActuallyMetIRL is Ownable {
    ISP public spInstance;
    uint64 public schemaId;
    mapping(address partyA => address partyB) public metIRLMapping;

    error ConfirmationAddressMismatch();

    event DidMeetIRL(address partyA, address partyB, uint64 attestationId);

    constructor() Ownable(_msgSender()) { }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function claimMetIRL(address partyB) external {
        metIRLMapping[_msgSender()] = partyB;
    }


    function confirmMetIRL(address partyA, bytes memory data) external returns (uint64) {
        address partyB = _msgSender();
        if (metIRLMapping[partyA] == partyB) {
            // B has confirm A's claim of having met them IRL
            // We now make an attestation of having actually met IRL
            bytes[] memory recipients = new bytes[](2);
            recipients[0] = abi.encode(partyA);
            recipients[1] = abi.encode(partyB);
            Attestation memory a = Attestation({
                schemaId: schemaId,
                linkedAttestationId: 0,
                attestTimestamp: 0,
                revokeTimestamp: 0,
                attester: address(this),
                validUntil: 0,
                dataLocation: DataLocation.ONCHAIN,
                revoked: false,
                recipients: recipients,
                data: data // SignScan assumes this is from `abi.encode(...)`
            });
            uint64 attestationId = spInstance.attest(a, "", "", "");
            emit DidMeetIRL(partyA, partyB, attestationId);
            return attestationId;
        } else {
            revert ConfirmationAddressMismatch();
        }
    }
}