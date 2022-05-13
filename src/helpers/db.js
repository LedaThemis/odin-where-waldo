import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDBZYLgpo3AmQfpoQ0ZpfKCa9vG9nrrb10',
  authDomain: 'odin-where-waldo.firebaseapp.com',
  projectId: 'odin-where-waldo',
  storageBucket: 'odin-where-waldo.appspot.com',
  messagingSenderId: '824841520879',
  appId: '1:824841520879:web:1deeb6521a8fc3ddb83d1a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchPositionsFromDB = async (imageID) => {
  const snapshot = await getDocs(collection(db, imageID));
  const resultArray = [];
  snapshot.forEach((doc) => {
    resultArray.push({ id: doc.id, ...doc.data() });
  });

  return resultArray;
};

// const writeDataToDB = async (imageID, data) => {
//   for (let key of Object.keys(data)) {
//     console.log(key);
//     console.log(data[key]);

//     await setDoc(doc(db, imageID, key), data[key]);
//   }
// };

export { fetchPositionsFromDB };
