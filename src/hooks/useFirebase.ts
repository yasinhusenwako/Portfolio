import { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  QueryConstraint 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Hook to fetch real-time data from a Firestore collection
export const useFirestoreCollection = (collectionName: string, ...queryConstraints: QueryConstraint[]) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...queryConstraints);
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error };
};

// Hook to add a document to Firestore
export const useAddDocument = (collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addDocument = async (data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      return docRef;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { addDocument, loading, error };
};

// Hook to update a document in Firestore
export const useUpdateDocument = (collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateDocument = async (docId: string, data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { updateDocument, loading, error };
};

// Hook to delete a document from Firestore
export const useDeleteDocument = (collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteDocument = async (docId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteDoc(doc(db, collectionName, docId));
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { deleteDocument, loading, error };
};
