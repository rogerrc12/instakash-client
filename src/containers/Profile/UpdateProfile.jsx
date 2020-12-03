import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { RiCheckLine } from "react-icons/ri";
import { profileValues } from "../../shared/formValues";
import { validateUpdateProfile } from "../../shared/validations";

import DatePicker from "../../components/UI/Form/Datepicker";
import Input from "../../components/UI/Form/FloatedLabel";

import Button from "../../components/UI/Button";

const UpdateProfile = (props) => {
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = (values) => props.updateProfile(values);

  return (
    <section className="h-full flex flex-col">
      <h2>Complete su perfil</h2>
      <p className="mb-5">Debe completar su perfil para hacer operaciones mayores de $ 10,000.</p>
      <Formik initialValues={profileValues} validationSchema={validateUpdateProfile} onSubmit={onSubmit}>
        {({ isValid, values }) => (
          <Form className="mt-12">
            <div className="flex items-start flex-wrap md:flex-no-wrap justify-center">
              <DatePicker name="DateBirth" placeholder="Fecha de nacimiento" />
              <Input type="select" name="Department" label="Departamento" className="w-full mr-3">
                <option value="">Selecciona una opción</option>
                <option value="Amazonas">Amazonas</option>
                <option value="Áncash">Áncash</option>
                <option value="Apurímac">Apurímac</option>
                <option value="Arequipa">Arequipa</option>
                <option value="Ayacucho">Ayacucho</option>
                <option value="Cajamarca">Cajamarca</option>
                <option value="Cuzco">Cuzco</option>
                <option value="Huancavelica">Huancavelica</option>
                <option value="Huánuco">Huánuco</option>
                <option value="Ica">Ica</option>
                <option value="Junín">Junín</option>
                <option value="La Libertad">La Libertad</option>
                <option value="Lambayeque">Lambayeque</option>
                <option value="Lima">Lima</option>
                <option value="Loreto">Loreto</option>
                <option value="Madre de Dios">Madre de Dios</option>
                <option value="Moquegua">Moquegua</option>
                <option value="Pasco">Pasco</option>
                <option value="Piura">Piura</option>
                <option value="Puno">Puno</option>
                <option value="San Martín">San Martín</option>
                <option value="Tacna">Tacna</option>
                <option value="Tumbes">Tumbes</option>
                <option value="Ucayali">Ucayali</option>
              </Input>
            </div>
            <div className="flex items-start flex-wrap md:flex-no-wrap justify-center">
              <Input name="Province" label="Provincia" type="text" className="w-full mr-3" value={values.Province} />
              <Input name="District" label="Distrito" type="text" className="w-full mr-3" value={values.District} />
            </div>
            <div className="flex items-start flex-wrap md:flex-no-wrap justify-center">
              <Input
                name="Address"
                label="Calle, Avenida, Nro. de vivienda"
                type="text"
                className="w-full mr-3"
                value={values.Address}
              />
              <Input name="Occupation" label="Ocupación" type="text" className="w-full mr-3" value={values.Occupation} />
            </div>
            <div className="flex items-start flex-start md:w-1/2 w-full">
              <Input name="Profession" label="Profesión" type="text" className="w-full mr-3" value={values.Profession} />
            </div>

            <div className="w-full flex justify-end mb-6 mt-3">
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                className={`submit-button mr-3 ld-over ${isLoading ? "running" : ""}`}
              >
                <span className="ld ld-ring ld-spin text-base" />
                <span className="mr-3">
                  <RiCheckLine />
                </span>
                Actualizar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default React.memo(UpdateProfile);
