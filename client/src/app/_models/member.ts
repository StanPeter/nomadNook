import Photo from "./photo";

interface Member {
  id: number;
  userName: string;
  gender: number;
  age: number;
  photoUrl: string;
  nickName: string;
  created: Date;
  lastActive: Date;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}

export default Member;
