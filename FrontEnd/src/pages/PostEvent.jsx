import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchVendor, handlePostEvent } from "../store/actions/actionCreator";

export default function PostEvent() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        eventName: '',
        proposedDate1: '',
        proposedDate2: '',
        proposedDate3: '',
        proposedLocation: '',
        postalCode: '',
        vendorUserId: '',
    });

    const vendor = useSelector(function (state) {
        return state.vendor
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handlePostEvent(formData))
            .then(() => {
                navigate('/company')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const navigateToCompany = () => {
        navigate('/company');
    };

    useEffect(() => {
        dispatch(fetchVendor())
    }, [])


    return (
        <div className="bg-base-100 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-6/12"
            >
                <button
                    onClick={navigateToCompany}
                    className="top-4 left-4 bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary my-5"
                >
                    Back
                </button>
                <h2 className="text-2xl font-semibold text-neutral mb-6">
                    Form Event
                </h2>

                <div className="mb-4">
                    <label htmlFor="eventName" className="block text-sm font-medium text-neutral">
                        Event Name
                    </label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="proposedDate1" className="block text-sm font-medium text-neutral">
                        Proposed Date 1
                    </label>
                    <input
                        type="date"
                        id="proposedDate1"
                        name="proposedDate1"
                        value={formData.proposedDate1}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="proposedDate2" className="block text-sm font-medium text-neutral">
                        Proposed Date 2
                    </label>
                    <input
                        type="date"
                        id="proposedDate2"
                        name="proposedDate2"
                        value={formData.proposedDate2}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="proposedDate3" className="block text-sm font-medium text-neutral">
                        Proposed Date 3
                    </label>
                    <input
                        type="date"
                        id="proposedDate3"
                        name="proposedDate3"
                        value={formData.proposedDate3}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="proposedLocation" className="block text-sm font-medium text-neutral">
                        Proposed Location
                    </label>
                    <input
                        type="text"
                        id="proposedLocation"
                        name="proposedLocation"
                        value={formData.proposedLocation}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="postalCode" className="block text-sm font-medium text-neutral">
                        Postal Code
                    </label>
                    <input
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="vendorUserId" className="block text-sm font-medium text-neutral">
                        Vendor User ID
                    </label>
                    <select
                        id="vendorUserId"
                        name="vendorUserId"
                        value={formData.vendorUserId}
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral rounded-md"
                    >
                        <option value="" disabled>Select an option</option>
                        {vendor.map(el => {
                            return <option value={el.id}>{el.username}</option>
                        })}
                    </select>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}