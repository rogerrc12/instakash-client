import React from "react";
import { useSelector } from "react-redux";
import { FiUser, FiUsers } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";

import Input from "../../../../components/AuthForm/Input";
import Select from "../../../../components/AuthForm/Select";
import WrapperButtons from "../../../../components/AuthForm/WrapperButtons";

const Step2 = (props) => {
  const { documentTypes } = useSelector((state) => state.registration);
  const { FirstName: fname, LastName: lname, IdDocumentType: dtype, DNINumber: dno } = props.values;
  const { FirstName, LastName, IdDocumentType, DNINumber } = props.errors;

  const isValid =
    fname.length > 0 &&
    lname.length > 0 &&
    dtype.length > 0 &&
    dno.length > 0 &&
    !FirstName &&
    !LastName &&
    !IdDocumentType &&
    !DNINumber;

  return (
    <>
      <legend className="text-sm text-gray-600 block">Datos del representante legal</legend>
      <Input
        name="FirstName"
        label="Primer Nombre"
        icon={FiUser}
        touched={props.touched.FirstName}
        error={props.errors.FirstName}
      />
      <Input
        name="LastName"
        label="Primer Apellido"
        icon={FiUsers}
        touched={props.touched.LastName}
        error={props.errors.LastName}
      />
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
      />
      <WrapperButtons isValid={isValid} previousHandler={props.goBack} continue continueHandler={props.continue} />
    </>
  );
};

export default React.memo(Step2);
