import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEventVendor, finishLoading } from "../store/actions/actionCreator"
import VendorTable from "../components/VendorTable"
import Loader from "../components/Loader"

export default function VendorAdminDashboard() {
    const dispatch = useDispatch()

    const events = useSelector(function (state) {
        return state.dataVendor
    })
    const isLoading = useSelector(function (state) {
        return state.isLoading
    })

    useEffect(() => {
        dispatch(fetchEventVendor())
            .then(() => {
                dispatch(finishLoading())
            })
    }, [])
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        )
    } else {
        return (
            <>
                <div className="bg-base-100 p-8">
                <h1 className="text-3xl font-bold text-white text-center py-8">Vendor Admin Dashboard</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="w-1/5">Event Name</th>
                                    <th className="w-1/5">Company Name</th>
                                    <th className="w-1/5">Confirmed Date (Proposed Dates if no Confirmed Date)</th>
                                    <th className="w-1/5">Status</th>
                                    <th className="w-1/5">Date Created</th>
                                    <th className="w-1/5">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <VendorTable key={event.id} event={event} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}