import { useState } from "react";
import PopUpEventCompany from "./PopUpEventCompany";

export default function CompanyDashboardTable({ data }) {
    const [showPopup, setShowPopup] = useState(false);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
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
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{data.eventName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{data.vendor.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{data.confirmedDate ? formatDate(data.confirmedDate) : (
                        <>
                            <div>
                                {formatDate(data.proposedDate1)}
                            </div>
                            <div>
                                {formatDate(data.proposedDate2)}
                            </div>
                            <div>
                                {formatDate(data.proposedDate3)}
                            </div>
                        </>
                    )
                    }</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {data.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(data.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-primary text-white px-4 text-center py-2 rounded-md" onClick={togglePopup}>
                        View
                    </button>
                </td>
            </tr>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <PopUpEventCompany event={data} closePopup={togglePopup} />
                </div>
            )}
        </>
    )
}