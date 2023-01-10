import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { auth } from '../config/firebase';
import { Marker } from '../utils/Marker';
import systemStore from './SystemStore';

// const baseUrl = 'https://rr-waze-final-project.uc.r.appspot.com/marker';
const baseUrl = 'http://localhost:3333/marker';

const getHeaders = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        Authorization: `Bearer ${token}`
    }
}

const addMarker = async (marker: Marker) => {
    try {
        const headers = await getHeaders();
        const res = await axios.post(baseUrl, marker, {
            headers: headers,
        });
        return res.data;
    } catch (error) { console.log(error); }
}

const getAllMarkersOfSystem = async () => {
    try {
        const res = await axios.get(`${baseUrl}systemsMarkers/${systemStore.currentSystem?._id}`)
        return res.data;
    } catch (error) { console.log(error); }
}

// const getSystemByUrlName = async (urlName: string | undefined) => {
//     try {
//         const res = await axios.get(`${baseUrl}/urlName/${urlName}`)
//         return res.data;
//     } catch (error) { console.log(error); }
// }

// const getSystemsOfAdmin = async () => {
//     try {
//         const headers = await getHeaders();  
//         const res = await axios.get(`${baseUrl}/ofAdmin`, {
//             headers: headers,
//         })
//         return res.data;
//     } catch (error) { console.log(error); }
// }

const getMarkerById = async (markerId: string) => {
    try {
        const res = await axios.get(`${baseUrl}/${markerId}`);
        return res.data;
    } catch (error) { console.log(error); }
}

const updateMarker = async (marker: Marker) => {
    const headers = await getHeaders();
    const res = await axios.put(`${baseUrl}/${marker._id}`, marker, {
        headers: headers,
    });
    return res.data;
}

const deleteMarker = async (markerId: string) => {
    const headers = await getHeaders();
    const res = await axios.delete(`${baseUrl}/${markerId}`, {
        headers: headers,
    });
    return res.data;
}

class Store {
    markers: Marker[] = [];
    currentMarker: Marker | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // async getAllSystems() {
    //     this.markers = await getAllmarker();
    // }

    // async getSystemByUrlName(urlName: string | undefined) {
    //     this.currentSystem = await getSystemByUrlName(urlName);
    // }

    async getAllMarkersOfSystem() {
        this.markers = await getAllMarkersOfSystem();
    }

    async getMarkerById(markerId: string) {
        this.currentMarker = await getMarkerById(markerId);
    }

    async addSystem(marker: Marker) {
        await addMarker(marker);
        this.markers.push(marker);
    }

    async updateMarker(marker: Marker) {
        this.currentMarker = await updateMarker(marker);
    }

    async deleteMarker(markerId: string) {
        await deleteMarker(markerId);
    }

}
const markerStore = new Store();
export default markerStore;