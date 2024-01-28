import axios from 'axios'

const axiosInstance = axios.create({baseURL: 'localhost:8000'});
interface ListingRequest {
    positionX: number;
    positionY: number;
    keyword: string;
    radius: number;
}
interface ListingResponse {
    //to be defined from backend
    JSONString: JSON
}
export async function Query(coords: ListingRequest): Promise<ListingResponse>{
    const response = await axiosInstance.post<ListingResponse>('/listing', coords)
    return response.data
} 