import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEventVendor, handleApproveEvent, handleRejectEvent } from "../store/actions/actionCreator";

export default function PopUpEventVendor({ event, closePopup }) {
    const dispatch = useDispatch()

    const [reason, setReason] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(true);

    const handleApprove = () => {
        if (selectedDate) {
            dispatch(handleApproveEvent(event.id, selectedDate))
                .then(() => {
                    closePopup()
                })
        } else {
            console.log('Please select a date before approving.');
        }
    };

    const handleReject = () => {
        dispatch(handleRejectEvent(event.id, reason))
            .then(() => {
                closePopup()
            })
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1
        const year = date.getUTCFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    }

    return (
        isPopupVisible && (
            <div className="bg-base-100 p-4 rounded-md">
                <button onClick={closePopup} className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md">X</button>

                <h2 className="text-primary text-xl font-bold mb-2">
                    Event Information
                </h2>
                <p>
                    Event Name: {event.eventName}
                    <br />
                    Proposed Date 1: {formatDate(event.proposedDate1)}
                    <br />
                    Proposed Date 2: {formatDate(event.proposedDate2)}
                    <br />
                    Proposed Date 3: {formatDate(event.proposedDate3)}
                    <br />
                    Proposed Location: {event.proposedLocation}
                    <br />
                    Postal Code: {event.postalCode}
                    <br />
                    Status: {event.status}
                    <br />
                    Created By User: {event.creator.username}
                    <br />
                    Created At: {formatDate(event.createdAt)}
                </p>

                <div>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-2 p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Date</option>
                        <option value={event.proposedDate1}>Proposed Date 1</option>
                        <option value={event.proposedDate2}>Proposed Date 2</option>
                        <option value={event.proposedDate3}>Proposed Date 3</option>
                    </select>

                    <button
                        onClick={handleApprove}
                        className="bg-success text-white px-4 py-2 mt-2 mr-2 rounded-md"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleReject}
                        className="bg-error text-white px-4 py-2 mt-2 rounded-md"
                    >
                        Reject
                    </button>
                    {reason && <p className="text-error mt-2">Reason: {reason}</p>}
                    <input
                        type="text"
                        placeholder="Reason for rejection"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
            </div>
        )
    )
}
