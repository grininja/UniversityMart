import {storage} from '../firebaseconfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const UploadFile = async (file, companyName, role) => {
    const storageRef = ref(storage, `${companyName}/${role}/${file.name}`);
    const uploadeRef = await uploadBytes(storageRef, file);
    const downLoadUrl = await getDownloadURL(uploadeRef.ref);
    console.log(downLoadUrl);
    return downLoadUrl;
  };