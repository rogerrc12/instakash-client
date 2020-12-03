import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

import InputPassword from "../../../../components/AuthForm/Password";
import Input from "../../../../components/AuthForm/Input";
import Select from "../../../../components/AuthForm/Select";
import Checkbox from "../../../../components/AuthForm/Checkbox";
import WrapperButtons from "../../../../components/AuthForm/WrapperButtons";

import classes from "../SignUp.module.scss";

const Step3 = (props) => {
  const { questions } = useSelector((state) => state.registration);
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <>
      <InputPassword
        label="Contraseña"
        name="PasswordHash"
        icon={FiLock}
        touched={props.touched.PasswordHash}
        error={props.errors.PasswordHash}
      />
      <InputPassword
        label="Confirmar contraseña"
        name="ConfirmPassword"
        icon={FiLock}
        touched={props.touched.ConfirmPassword}
        error={props.errors.ConfirmPassword}
      />
      <Select
        name="IdQuestion"
        label="Pregunta de seguridad"
        icon={AiOutlineQuestionCircle}
        touched={props.touched.IdQuestion}
        error={props.errors.IdQuestion}
      >
        <option value="">Pregunta de seguridad</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.questionDes}
          </option>
        ))}
      </Select>
      <Input
        name="Answer"
        label="Respuesta"
        icon={AiOutlineQuestionCircle}
        touched={props.touched.Answer}
        error={props.errors.Answer}
      />
      <Checkbox name="AccepTerms" className={props.touched.AccepTerms && props.errors.AccepTerms && classes.Error}>
        He leido y acepto sus{" "}
        <Link to="/" className={props.touched.AccepTerms && props.errors.AccepTerms && classes.Error}>
          Términos y condiciones
        </Link>
        .
      </Checkbox>
      <WrapperButtons isValid={props.isValid} previousHandler={props.goBack} isLoading={isLoading} />
    </>
  );
};

export default React.memo(Step3);
