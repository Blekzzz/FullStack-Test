import { useState } from "react";

export default function PopUpEventCompany({ event, closePopup }) {
    const [isPopupVisible, setPopupVisible] = useState(true);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    }

    return (
        isPopupVisible && (
            <div className="popup-container bg-white p-6 rounded-md shadow-md">
                <button onClick={closePopup} className="close-button bg-red-500 text-white px-4 py-2 rounded-full">
                    X
                </button>

                <h2 className="popup-title text-primary text-2xl font-bold mb-4">
                    Event Information
                </h2>

                <div className="popup-content">
                    <p>
                        <strong>Event Name:</strong> {event.eventName}
                    </p>
                    <p>
                        <strong>Proposed Dates:</strong>
                        <br />
                        Date 1: {formatDate(event.proposedDate1)}
                        <br />
                        Date 2: {formatDate(event.proposedDate2)}
                        <br />
                        Date 3: {formatDate(event.proposedDate3)}
                    </p>
                    {
                        !event.confirmedDate ? null : (
                            <p>
                                <strong>Confirmed Date:</strong> {formatDate(event.confirmedDate)}
                            </p>
                        )
                    }
                    <p>
                        <strong>Location:</strong> {event.proposedLocation}
                        <br />
                        <strong>Postal Code:</strong> {event.postalCode}
                        <br />
                        <strong>Status:</strong> {event.status}
                        <br />
                        <strong>Created By:</strong> {event.creator.username}
                        <br />
                        <strong>Created At:</strong> {formatDate(event.createdAt)}
                    </p>
                </div>
            </div>
        )
    );
}
