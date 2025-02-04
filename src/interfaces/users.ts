export interface User {
    employeeId: string;
    name: string;
    email: string;
    photo: string; 
    startDate: string; 
    description: string;
    contact: string;
    status: "active" | "inactive";
}  