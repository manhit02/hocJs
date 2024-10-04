"use client";
import { createContext } from "react";
import { initState } from "./reducer";

const Context = createContext<any>(initState);

export default Context;
