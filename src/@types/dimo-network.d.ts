declare module '@dimo-network/dimo-node-sdk' {
    export class DIMO {
        constructor(environment: 'Production' | 'Dev');
        authenticate(): Promise<any>;
        vehicles: {
            listByLocation(params: { location: string }): Promise<{ vehicles: any[] }>;
            getById(params: { id: number }): Promise<any>;
        };
        // Add other methods and properties as needed
    }
}