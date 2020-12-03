import React from "react";
import { useSelector } from "react-redux";
import { validateDNINumber } from "../../../../shared/validations";
import { Link } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";

import Input from "../../../../components/AuthForm/Input";
import InputPassword from "../../../../components/AuthForm/Password";
import Select from "../../../../components/AuthForm/Select";
import WrapperButtons from "../../../../components/AuthForm/WrapperButtons";
import Checkbox from "../../../../components/AuthForm/Checkbox";

import classes from "../SignUp.module.scss";

const Step2 = (props) => {
  const { questions, documentTypes } = useSelector((state) => state.registration);
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <>
      <Select
        name="IdDocumentType"
        label="Tipo de documento"
        icon={FaRegAddressCard}
        touched={props.touched.IdDocumentType}
        error={props.errors.IdDocumentType}
      >
        <option value="">Tipo de documento</option>
        {documentTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.docTypeDes}
          </option>
        ))}
      </Select>
      <Input
        name="DNINumber"
        label="Número de documento"
        icon={FaRegAddressCard}
        touched={props.touched.DNINumber}
        error={props.errors.DNINumber}
        validate={(value) => validateDNINumber(value, props.values.IdDocumentType)}
      />
      <InputPassword
        name="PasswordHash"
        label="Contraseña"
        icon={FiLock}
        touched={props.touched.PasswordHash}
        error={props.errors.PasswordHash}
      />
      <InputPassword
        name="ConfirmPassword"
        label="Confirmar contraseña"
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

export default React.memo(Step2);
