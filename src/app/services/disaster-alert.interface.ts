export interface IDisasterAlert {
    type: string;
    details: string;
    location: {
      type: string;
      coordinates: number[];
    };
    createdAt: Date;
  }
  