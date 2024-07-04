interface Location {
  id: number;
  streetName: string;
  area: string;
  city: string;
  pinCode: string;
  state: string;
  coordinates: string;
}

interface MediaDetails {
  shelfLife: string;
  isVeg: boolean;
  allergens: string[];
  quantity: number;
  unit: string;
}

interface PostData {
  id: number;
  image: string;
  //image: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  location: Location;
  caption: string;
  title: string;
  postType: string;
  mediaDetails: MediaDetails;
  isDeliveryDone: Number;
  isPickedUp: Number;
  userId: string;
  deliveryId: string;
}

export default PostData;
export type { Location };
