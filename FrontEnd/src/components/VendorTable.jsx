import { useState } from "react";
import PopUpEventVendor from "./PopUpEventVendor";

export default function VendorTable({ event }) {
    const [showPopup, setShowPopup] = useState(false);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1
        const year = date.getUTCFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <tr className="text-neutral">
                <td className="text-center py-2">{event.eventName}</td>
                <td className="text-center py-2">{event.creator.username}</td>
                <td className="text-center py-2">
                    {event.confirmedDate ? formatDate(event.confirmedDate) : (
                        <>
                            <div>
                                {formatDate(event.proposedDate1)}
                            </div>
                            <div>
                                {formatDate(event.proposedDate2)}
                            </div>
                            <div>
                                {formatDate(event.proposedDate3)}
                            </div>
                        </>
                    )}
                </td>
                <td className="text-center py-2">{event.status}</td>
                <td className="text-center py-2">{formatDate(event.createdAt)}</td>
                <td className="text-center py-2">
                    {
                        event.status !== "Pending" ? null : <button className="bg-primary text-white px-4 text-center py-2 rounded-md" onClick={togglePopup}>
                            View
                        </button>
                    }
                </td>
            </tr>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <PopUpEventVendor event={event} closePopup={togglePopup} />
                </div>
            )}
        </>
    )
}
