export interface VehicleSpecs {
  engine: string;
  fuelConsumption: string;
  horsePower: string;
  driveSystem: string;
  transmission: string;
  acceleration: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: "SUV" | "Sedan" | "Electric" | "Sport";
  brand: string;
  price: number;
  year: number;
  fuel: "Bensin" | "Hybrid" | "Listrik";
  transmission: "Otomatis" | "Manual";
  image: string;
  images: string[];
  tags: string[];
  description: string[];
  specs: VehicleSpecs;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}
