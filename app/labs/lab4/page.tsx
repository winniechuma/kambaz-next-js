"use client"
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import ReduxExamples from "./redux/page";

export default function Lab4() {
    function sayHello() {
     alert("Hello");
    }

    return (
       <Provider store={store}>
        <div id = "wd-lab4">
            <h2>Lab 4</h2>     
            <ClickEvent />
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello}/>
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            {/* <Link href="./redux">Redux Examples</Link> */}
            <Link href="./lab4/redux">Redux Examples</Link>

            {/* <ReduxExamples /> */}
                 <hr />
            <Link href="./lab4/react-context">React Context Examples</Link>
            <hr />
            <Link href="./lab4/zustand">Zustand Examples</Link>

            </div>
            </Provider>
);}