import { useState, type ChangeEventHandler, type MouseEventHandler } from "react";
import { DayPicker, addToRange } from "react-day-picker";
import {} from "date-fns";
import moment from "moment";

import "react-day-picker/dist/style.css";

import CancelIcon from "@/components/search/svg/CancelIcon";

const getInitialFromDate = (timestamp) => {
    if (timestamp) {
        return moment.unix(timestamp).toDate();
    } else {
        return moment().subtract(7, "day").toDate();
    }
};

const getInitialToDate = (timestamp) => {
    if (timestamp) {
        return moment.unix(timestamp).toDate();
    } else {
        return moment().toDate();
    }
};

export default function DatePicker({ startDate, endDate, elRef, show, hideDatePicker, submitDatePicker }) {
    const [from, setFrom] = useState(getInitialFromDate(startDate));
    const [to, setTo] = useState(getInitialToDate(endDate));

    // TODO: make sure this works correctly after react-day-picker upgrade
    const handleDayClick = (day, modifiers) => {
        if (!modifiers.disabled) {
            const range = addToRange(day, { from, to });
            setFrom(range?.from!);
            setTo(range?.to!);
        }
    };

    const updateFromInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFrom(moment(event.target.value).toDate());
    };

    const updateToInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTo(moment(event.target.value).toDate());
    };

    const requestCancel: MouseEventHandler<HTMLButtonElement> = () => {
        setFrom(getInitialFromDate(startDate));
        setTo(getInitialToDate(endDate));
        hideDatePicker();
    };

    return (
        <div className={show ? "date-picker-dropdown" : "date-picker-dropdown hide"} ref={elRef}>
            <div className="date-picker-container">
                <DayPicker
                    numberOfMonths={1}
                    selected={[from, { from, to }]}
                    onDayClick={handleDayClick}
                    disabled={{ after: new Date() }}
                />
                <div className="date-picker-form">
                    <fieldset>
                        <h3>Custom Date Range</h3>
                        <div>
                            <label>From</label>
                            <input
                                type="date"
                                placeholder="From date"
                                value={moment(from).format("YYYY-MM-DD")}
                                onChange={updateFromInputValue}
                            />
                        </div>
                        <div>
                            <label>To</label>
                            <input
                                type="date"
                                placeholder="To date"
                                value={moment(to).format("YYYY-MM-DD")}
                                onChange={updateToInputValue}
                            />
                        </div>
                        <div className="date-picker-action-buttons">
                            <button onClick={requestCancel}>
                                <CancelIcon />
                                Cancel
                            </button>
                            <button type="submit" onClick={() => submitDatePicker(from, to)}>
                                Apply
                            </button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
