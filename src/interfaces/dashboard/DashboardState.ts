export interface DashboardCardProps {
    icon: React.ComponentType;
    title: string;
    value: number;
  }

  export interface Booking {
    roomType: string;
    roomNumber: number;
    reservationNumber:string;
    guest: {
      fullName: string;
    };
    checkIn: string;
    checkOut: string;
    photo?: string;
    status: string;
  }