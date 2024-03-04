import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductByName } from "../../redux/slices/ProductSlice";

export default function SearchForm({
    setUserInput,
    userInput,
}: {
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    userInput: string;
}) {
    const dispatch = useDispatch();

    // const [userInput, setUserInput] = useState("");

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInput(event.target.value);
        dispatch(searchProductByName(event.target.value));
    }
    return (
        <div>
            SearchForm
            <input value={userInput} type="text" onChange={onChangeHandler} />
        </div>
    );
}