import { LoginResponse, UserLoginRequest, Van } from "./types";

import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");

export const getVansMirage = async (id?: string): Promise<Van[] | Van> => {
	const url = id ? `/api/vans/${id}` : "/api/vans";
	const res = await fetch(url);
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status,
		};
	}
	const data = await res.json();
	return data.vans?.length ? (data.vans as Van[]) : (data.vans as Van);
};

export const getVans = async (): Promise<Van[]> => {
	const querySnapshot = await getDocs(vansCollectionRef);
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return dataArr as Van[];
};

export const getVan = async (id: string): Promise<Van> => {
	const docRef = doc(db, "vans", id);
	const vanSnapshot = await getDoc(docRef);
	return { ...vanSnapshot.data(), id: vanSnapshot.id } as Van;
};

export const getHostVans = async (): Promise<Van[]> => {
	const q = query(vansCollectionRef, where("hostId", "==", "123"));
	const vanCollectionSnapshot = await getDocs(q);
	const dataArr = vanCollectionSnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return dataArr as Van[];
};

export const getHostVan = async (id: string): Promise<Van> => {
	const foo = doc(vansCollectionRef, id);
	const snapShot = await getDoc(foo);
	return { ...snapShot.data(), id: snapShot.id } as Van;
};

export const getHostVansMirage = async (id?: string): Promise<Van[] | Van> => {
	const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
	const res = await fetch(url);
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status,
		};
	}
	const data = await res.json();
	return data.vans?.length ? (data.vans as Van[]) : (data.vans as Van);
};

export const loginUser = async (
	creds: UserLoginRequest,
): Promise<LoginResponse> => {
	const res = await fetch("/api/login", {
		method: "post",
		body: JSON.stringify(creds),
	});
	const data = await res.json();

	if (!res.ok) {
		throw {
			message: data.message,
			statusText: res.statusText,
			status: res.status,
		};
	}

	return data as LoginResponse;
};
