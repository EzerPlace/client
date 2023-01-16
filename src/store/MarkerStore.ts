// import { makeAutoObservable } from 'mobx';
// import axios from 'axios';
// import { auth } from '../config/firebase';
// import { Marker } from '../utils/Marker';
// import systemStore from './SystemStore';

// // const baseUrl = 'https://rr-waze-final-project.uc.r.appspot.com/marker';
// const baseUrl = 'http://localhost:3333/marker';

// const getHeaders = async () => {
//     const token = await auth.currentUser?.getIdToken();
//     return {
//         Authorization: `Bearer ${token}`
//     }
// }

// const addMarker = async (marker: Marker) => {
//     try {
//         const headers = await getHeaders();
//         const res = await axios.post(baseUrl, marker, {
//             headers: headers,
//         });
//         return res.data;
//     } catch (error) { console.log(error); }
// }

// const getAllMarkersOfSystem = async () => {
//     try {
//         const res = await axios.get(`${baseUrl}systemsMarkers/${systemStore.currentSystem?._id}`)
//         return res.data;
//     } catch (error) { console.log(error); }
// }

// // const getSystemByUrlName = async (urlName: string | undefined) => {
// //     try {
// //         const res = await axios.get(`${baseUrl}/urlName/${urlName}`)
// //         return res.data;
// //     } catch (error) { console.log(error); }
// // }

// // const getSystemsOfAdmin = async () => {
// //     try {
// //         const headers = await getHeaders();  
// //         const res = await axios.get(`${baseUrl}/ofAdmin`, {
// //             headers: headers,
// //         })
// //         return res.data;
// //     } catch (error) { console.log(error); }
// // }

// const getMarkerById = async (markerId: string) => {
//     try {
//         const res = await axios.get(`${baseUrl}/${markerId}`);
//         return res.data;
//     } catch (error) { console.log(error); }
// }

// const updateMarker = async (marker: Marker) => {
//     const headers = await getHeaders();
//     const res = await axios.put(`${baseUrl}/${marker._id}`, marker, {
//         headers: headers,
//     });
//     return res.data;
// }

// const deleteMarker = async (markerId: string) => {
//     const headers = await getHeaders();
//     const res = await axios.delete(`${baseUrl}/${markerId}`, {
//         headers: headers,
//     });
//     return res.data;
// }

// class Store {
//     markers: Marker[] = [];
//     currentMarker: Marker | null = null;

//     constructor() {
//         makeAutoObservable(this);
//     }

//     // async getAllSystems() {
//     //     this.markers = await getAllmarker();
//     // }

//     // async getSystemByUrlName(urlName: string | undefined) {
//     //     this.currentSystem = await getSystemByUrlName(urlName);
//     // }

//     async getAllMarkersOfSystem() {
//         this.markers = await getAllMarkersOfSystem();
//     }

//     async getMarkerById(markerId: string) {
//         this.currentMarker = await getMarkerById(markerId);
//     }

//     async addSystem(marker: Marker) {
//         await addMarker(marker);
//         this.markers.push(marker);
//     }

//     async updateMarker(marker: Marker) {
//         this.currentMarker = await updateMarker(marker);
//     }

//     async deleteMarker(markerId: string) {
//         await deleteMarker(markerId);
//     }

// }
// const markerStore = new Store();
// export default markerStore;


// import axios from 'axios';
// import { makeAutoObservable } from 'mobx';
// import { Marker } from '../utils/Marker';

// const addMarker = async (marker: Marker) => {
//     debugger
// try {
//     const res = await axios.post(`http://localhost:3333/marker/createMarker`, marker);
//     let tempList = await res.data;
//     debugger
//     console.log(tempList);
//     return tempList;
// } catch (error) { console.log(error); }
// }

// class Store {
// markers: Marker[] = [];
// constructor() {
//         makeAutoObservable(this);
// }
// async addMarker(marker: Marker) {
//     debugger
//     const markerAdded = await addMarker(marker);
//     this.markers.push(markerAdded);
// }}

// const markerStore = new Store();

// export default markerStore;

import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/Marker';
import systemStore from './SystemStore';
import userStore from './UserStore';
import { auth } from '../config/firebase';

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
        const res = await axios.post(`${baseUrl}/createMarker`, marker, {
            headers: headers,
        });
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}

// const UpdateMarker = async (id: string, marker: Marker) => {
//     try {
//         const res = await axios.put(`http://localhost:3333/marker/${id}`, marker);
//         let tempList = await res.data;
//         return tempList;
//     } catch (error) { console.log(error); }
// }

const getAllMarkerForSystem = async (system_id: string) => {
    try {
        const headers = await getHeaders();
        const res = await axios.get(`${baseUrl}/systemsMarkers/${system_id}`, {
            headers: headers,
        });
        let tempList = await res.data;
        console.log(tempList);
        return tempList;
    }
    catch (error) { console.log(error); }
}

const deleteMarker = async (marker_id: string | undefined) => {
    try {
        const res = await axios.delete(`http://localhost:3333/marker/${marker_id}`);
        let tempList = await res.data;
        return tempList;
    }
    catch (error) { console.log(error); }
}

const getMarkersBySystemId = async (systemId: string) => {
    try {
        const res = await axios.delete(`http://localhost:3333/marker/getBySystemId/${systemId}`);
        let tempList = await res.data;
        return tempList;
    }
    catch (error) { console.log(error); }
}
class Store {
    markers: Marker[] = [];
    currentMarker: any = null;
    autoCompleteMarker: { lat: number, lng: number } = { lat: 0, lng: 0 }
    constructor() {
        makeAutoObservable(this);
    }

    async getAllMarkerForSystem(id: string) {
        this.markers = await getAllMarkerForSystem(id)
    }

    async removeMarkers(id: string) {
        console.log(this.markers)
        await deleteMarker(id)
        this.markers = this.markers.filter((m) => (m._id !== id))
        console.log(this.markers)
    }

    async SetcurrentMarker(name: string) {
        this.currentMarker = this.markers.find((m) => (m.name === name))
    }

    async SearchMarker(name: string | undefined) {
        if (name !== "") {
            this.currentMarker = this.markers.find((m) => (m.name === name))
            console.log(this.currentMarker.name)
        }
    }

    async addMarker(marker: Marker) {
        marker.system_id = systemStore.currentSystem?._id || '';
        marker.manager_id = userStore.user?.fireBaseUId || '';
        const markerAdded = await addMarker(marker)
        this.markers.push(markerAdded);
        this.currentMarker = markerAdded;
    }

    // async UpdateMarker(id: string, marker: any) {
    //     await UpdateMarker(id, marker)

    //     this.markers = await getAllMarkerForSystem(systemStore.currentSystem._id)
    //     this.currentMarker = null
    //     //request function
    // }

    async getMarkersBySystemId(systemId: string) {
        this.markers = await getMarkersBySystemId(systemId)
    }

}
const markerStore = new Store();
export default markerStore;