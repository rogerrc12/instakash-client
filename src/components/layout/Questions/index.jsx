import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const questions = [
  // {
  //   title: "Instakash",
  //   key: 1,
  //   content: (
  //     <p>
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu
  //       tristique justo. Aliquam lobortis volutpat sem eu tempus. Ut nulla
  //       turpis, laoreet non justo ut, facilisis pharetra risus. In facilisis ut
  //       lectus in fermentum. Nunc vel neque sed leo suscipit egestas. In hac
  //       habitasse platea dictumst. Proin sapien ante, viverra ac iaculis ut,
  //       dictum sed lorem. Mauris nec vestibulum arcu. Maecenas ut mollis tellus.
  //       Nulla vel nisi sit amet erat ornare dignissim id sed turpis. Phasellus
  //       sit amet lacinia lectus. Maecenas consectetur mattis sapien, eu
  //       imperdiet ante rhoncus ut. Phasellus sagittis molestie leo.
  //     </p>
  //   ),
  // },
  {
    title: "Mi usuario",
    key: 2,
    content: (
      <>
        <h4>¿Cómo edito los datos de perfil?</h4>
        <p>
          Si hay algún error en los datos o si simplemente ha cambiado de domicilio, el equipo de soporte al cliente de Instakash
          puede ayudarle a corregir esta información. En este caso, necesitará enviarnos un correo con algún tipo de prueba para
          demostrar que estos datos son correctos a contacto@instakash.net
        </p>
        <br />
        <h4>¿Cómo cambio mi contraseña?</h4>
        <p>
          Puedes crear una nueva contraseña dándole click a "olvidé mi contraseña" en la sección de inicio de sesión. Recibirás un
          correo electrónico con las instrucciones a seguir para restablecer tu contraseña.
        </p>
        <br />
        <h4>¿Cómo cambio mi dirección de correo electrónico?</h4>
        <p>
          La dirección de correo electrónico solo podrá ser cambiada comunicándote con nosotros vía correo electrónico. Deberá
          escribirnos a contacto@instakash.net.
        </p>
        <br />
        <h4>¿Cómo reviso mis transacciones?</h4>
        <p>
          Todas sus transacciones quedan registradas y ligadas a su cuenta en la sección de “ACTIVIDAD”. Puede verificar, en
          tiempo real, el avance de cada transacción que has colocado. Asimismo, podrá seleccionar transacciones frecuentes para
          poder realizarlas con más rapidez.
        </p>
      </>
    ),
  },
  {
    title: "Cambio de Divisas",
    key: 3,
    content: (
      <>
        <h4>¿Cuál es el monto máximo de operación?</h4>
        <p>
          Instakash no tiene monto máximo. Sin embargo, su banco le puede asignar un máximo de transferencia al día. En ese caso
          puede realizar su transferencia en la misma agencia, por ventanilla (solo si la cuenta es de Lima). Por ventanilla no
          existe límite. Luego debe enviar una foto de su constancia de transferencia al correo cambios@instakash.net para
          completar la operación con éxito. *En el caso de provincias, solo puede utilizar su banca en línea para empresas o
          personas.
        </p>
        <br />
        <h4>Hay un tipo de cambio garantizado?</h4>
        <p>
          El tipo de cambio cerrado al momento de pactar la operación define el monto que el cliente recibe después de validar la
          operación. Este tipo de cambio está garantizado por un tiempo de 30 minutos luego de colocada la orden de compra, tiempo
          durante el cual el usuario deberá realizar la transferencia a las cuentas de Instakash y enviar el comprobante.
        </p>
        <br />
        <h4>¿Cuál es mi prueba de que se realizó el pago?</h4>
        <p>
          La constancia de tu operación puede ser el Número de operación del comprobante de pago si es de un mismo banco. Si es
          interbancaria, la constancia será el mismo voucher que puede ser la constancia física (papel recibido después de hacer
          el depósito) o virtual (enviada por mail al momento de hacer la transferencia).
        </p>
        <br />
        <h4>Validación de la transferencia</h4>
        <p>
          La validación de la transferencia se dará cuando recibamos en nuestras cuentas el dinero y lo validemos con el voucher
          de la operación. Una vez confirmada la operación en nuestras cuentas recibirás una confirmación vía mail y en nuestro
          portal web. El proceso de validación demora como máximo un día hábil.
        </p>
        <br />
        <h4>¿Con qué monedas trabaja Instakash?</h4>
        <p>Por el momento, solo trabajamos con dólares y soles.</p>
        <br />
        <h4>¿Puedo ver el avance de mis operaciones?</h4>
        <p>
          Todas las transferencias que hayas realizado quedarán registradas en tu perfil. Además, serás notificado vía correo
          electrónico cuando se realice con éxito cada transacción.
        </p>
        <h4>Tiempo estimado de los bancos</h4>
        <p>
          El tiempo estimado que demora la transferencia está sujeto al tiempo que demoren en llegar los fondos transferidos a las
          cuentas de Instakash. Nosotros no tenemos ningún control sobre el tiempo que pueda llegar a demorar la transferencia de
          los fondos. Instakash no realizará ninguna transacción sin antes haber recibido los fondos por parte del cliente. Por lo
          general, el tiempo total para completar la transacción no debería ser mayor a dos días hábiles.
        </p>
        <br />
        <h4>¿Cómo cancelo una operación?</h4>
        <p>
          Puedes cancelar tu operación si todavia no has hecho tu transferencia dando click al botón "cancelar". Si ya has creado
          una orden de cambio y hay datos del destinatario que no son correctos, por favor ponte en contacto con nosotros lo antes
          posible para que podamos ayudarte. Puedes escribirnos un mail a contacto@instakash. o a nuestros whatsapp con tus datos
          y te contactaremos a la brevedad para solucionar el problema.
        </p>
      </>
    ),
  },
  {
    title: "Avance de Efectivo",
    key: 4,
    content: <p>Proximamente podrás solicitar dinero desde tu tarjeta de crédito con nosotros.</p>,
  },
];

const FrequentlyAskedQuestions = () => {
  return (
    <>
      <h2 className="font-bold text-xl mt-4 mb-2">Preguntas frecuentes</h2>
      <p className="text-sm">Información acerca del uso de la plataforma.</p>
      <div className="mt-4">
        <Collapse expandIconPosition="right">
          {questions.map((q) => (
            <Panel header={q.title} key={q.key}>
              {q.content}
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
};

export default FrequentlyAskedQuestions;
