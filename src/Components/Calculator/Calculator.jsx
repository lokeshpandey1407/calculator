import React, { useState } from "react";
import styles from "./Calculator.module.css";
import Button from "../Button/Button";
import { evaluate } from "mathjs";

const Calculator = ({ result, setResult }) => {
  const [input, setInput] = useState(result);
  const [isDecimal, setIsDecimal] = useState(false);
  const [isOperator, setIsOperator] = useState(false);

  //Function to clear the  expression and result
  const handleClear = () => {
    setInput("");
    setResult("");
    setIsDecimal(false);
    setIsOperator(false);
  };

  //Setting history to local storage
  const setToLocalStorage = (expression, answer) => {
    let id = new Date().getTime() - Math.random();
    let Calcu_calculations =
      JSON.parse(localStorage.getItem("calu_calu")) || [];
    const calculation = { id, expression, answer };
    Calcu_calculations.push(calculation);
    localStorage.setItem("calu_calu", JSON.stringify(Calcu_calculations));
  };

  const handleResult = () => {
    try {
      // Handlling percentage calculations before evaluation
      const parsedInput = input.replace(/(\d+(\.\d+)?)%/g, "($1 / 100)");
      const evaluatedResult = evaluate(parsedInput);
      setResult(evaluatedResult.toFixed(3));
      setToLocalStorage(input, evaluatedResult);
      setIsOperator(false);
    } catch (error) {
      setResult("Invalid Expression");
    }
  };

  //Function to Handle delete expression element
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  //Function to change the input on the click of a button
  const handleChange = (val) => {
    if (val === "." && !isDecimal) {
      setIsDecimal(true);
    } else if (val === "." && isDecimal) {
      return;
    }
    if (
      val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "%"
    ) {
      setIsDecimal(false);
    }
    if (
      val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "." ||
      val === "%"
    ) {
      if (!isOperator && input !== "") {
        setIsOperator(true);
        setInput((prev) => {
          return prev + val.toString();
        });
      }
    } else {
      setInput((prev) => {
        return prev + val.toString();
      });
      setIsOperator(false);
    }
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.input}>
        <textarea value={input} disabled />
      </div>
      <div className={styles.result}>
        <p>{result}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button handleButtonAction={handleClear} title={"AC"} value={"AC"} />
        <Button handleButtonAction={handleChange} title={"%"} value={"%"} />
        <Button handleButtonAction={handleDelete} title={"Del"} value={"Del"} />
        <Button handleButtonAction={handleChange} title={"/"} value={"/"} />

        <Button handleButtonAction={handleChange} title={"7"} value={7} />
        <Button handleButtonAction={handleChange} title={"8"} value={8} />
        <Button handleButtonAction={handleChange} title={"9"} value={"9"} />
        <Button handleButtonAction={handleChange} title={"x"} value={"*"} />

        <Button handleButtonAction={handleChange} title={"4"} value={4} />
        <Button handleButtonAction={handleChange} title={"5"} value={5} />
        <Button handleButtonAction={handleChange} title={"6"} value={6} />
        <Button handleButtonAction={handleChange} title={"-"} value={"-"} />

        <Button handleButtonAction={handleChange} title={"1"} value={1} />
        <Button handleButtonAction={handleChange} title={"2"} value={2} />
        <Button handleButtonAction={handleChange} title={"3"} value={3} />
        <Button handleButtonAction={handleChange} title={"+"} value={"+"} />

        <Button handleButtonAction={handleChange} title={"00"} value={"00"} />
        <Button handleButtonAction={handleChange} title={"0"} value={0} />
        <Button handleButtonAction={handleChange} title={"."} value={"."} />
        <Button handleButtonAction={handleResult} title={"="} value={"="} />
      </div>
    </div>
  );
};

export default Calculator;
