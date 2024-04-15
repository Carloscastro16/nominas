import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore"; 

// used for the firestore refs
import { db } from '@/services/firebaseInit'
const permitsRef = collection(db, "permits");
const vacationsRef = collection(db, "vacations");
const settingsRef = collection(db, "settings");
const employeesRef = collection(db, "employees");

// --- Employee Functions 
export async function setEmployeeInfo(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(employeesRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function getEmployeeById(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const employeeDocRef = doc(db, "employees", id);
        const docSnap = await getDoc(employeeDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}
export async function getAllEmployees(){
    let response!: any;
    try {
        const querySnapshot = await getDocs(employeesRef);
        querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(doc.data());
        console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error(error)
    }
    console.log(response)
    return response;
}

// --- Vacations Functions 
export async function setRequestVacations(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(vacationsRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function getAllVacationPermits(){
    const docRef = doc(db, "vacations");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}
export async function getVacationById(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const vacationsDocRef = doc(db, "vacations", id);
        const docSnap = await getDoc(vacationsDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}

// --- Permits Functions 
export async function setRequestPermits(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(permitsRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function getAllPermits(){
    let response!: any;
    try {
        const querySnapshot = await getDocs(permitsRef);
        querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(doc.data());
        console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error(error)
    }
    console.log(response)
    return response;
}
export async function getPermitById(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const permitDocRef = doc(db, "permits", id);
        const docSnap = await getDoc(permitDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}

// --- Settings Functions

export async function setSettingsInfo(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(settingsRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function updateSettingsInfo(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(settingsRef), formValue, { merge: true });
    } catch (error) {
        console.error(error);
        return
    }
}

export async function getSettingsByUser(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const settingsDocRef = doc(db, "settings", id);
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}