import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchEventCompany, finishLoading } from "../store/actions/actionCreator"
import Loader from '../components/Loader.jsx'
import CompanyDashboardTable from "../components/CompanyDashboardTable.jsx"

export default function CompanyHrAdminDashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const events = useSelector(function (state) {
        return state.dataCompany
    })
    const isLoading = useSelector(function (state) {
        return state.isLoading
    })

    useEffect(() => {
        dispatch(fetchEventCompany())
            .then(() => {
                dispatch(finishLoading())
            })
    }, [])

    const handlePageChange = (e) => {
        e.preventDefault()
        navigate('/company/post')
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        )
    } else {
        return (
            <div className="bg-base-100 min-h-screen">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-white text-center">Company HR Admin Dashboard</h1>
                        <div className="text-right mt-4">
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary hover:scale-110"
                                onClick={handlePageChange}
                            >
                                Post Event
                            </button>
                        </div>
                        <div className="mt-4">
                            {events.length == 0 ? (
                                <p className="text-gray-500 text-center">You don't have any events.</p>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200 bg-white">
                                    <thead className="bg-neutral">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Event Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vendor Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Confirmed Date (Proposed Dates if no Confirmed Date)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date Created
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {events.map(el => {
                                            return <CompanyDashboardTable data={el} key={el.id} />
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}