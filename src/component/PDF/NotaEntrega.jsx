import React from 'react';
import RobotoBold from './Roboto/Roboto-Bold.ttf';
import RobotoRegular from './Roboto/Roboto-Regular.ttf';
import logo from "./bel-nota-de-entrega.jpg";
import { Page, Text, Document, StyleSheet, Font, View, Image } from '@react-pdf/renderer';
import moment from 'moment';
//fecha
moment.lang('es', {
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_')
});
const fecha = moment();
//Font
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoBold,
      fontWeight: 'bold',
    },
    {
      src: RobotoRegular,
      fontWeight: 'normal',
    },
  ],
});
// Create styles
const marginTop = 10;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    paddingHorizontal: 80,
    paddingVertical: 20,
    fontSize: 10
  },
  img: {
    height: 40,
    width: 100,
    alignItems: 'flex-start'
  },
  titulo: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginTop,
    textAlign: 'center',
  },
  negrita: {
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  parrafo: {
    marginTop,
    textAlign: 'justify'
  },
  item: {
    marginTop: 1,
    textAlign: 'justify'
  },
  lista: {
    marginTop,
    marginLeft: 20,
    textAlign: 'left'
  },
  firma: {
    marginTop: 15,
    paddingHorizontal: 80,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center', 
    justifyContent: 'center'
  }
});

const list = [
  { id: "marca", name: "Marca" },
  { id: "modelos", name: "Modelo" },
  { id: "serial", name: "Serial" },
  { id: "csb", name: "CSB" },
  { id: "serial_cargador", name: "Serial Cargador" },
  { id: "ram", name: "Memoria RAM" },
  { id: "dd", name: "Disco Duro" },
  { id: "so", name: "Sistema Operativo" },
  { id: "usuario_so", name: "Nombre PC" }
];

const normas = [
  "1. Cada persona es responsable del cuidado y resguardo del (los) equipo (s) electrónico (s) asignado (s), tales como: PC’s, Laptops, Ipad y otros similares.",
  "2. Se prohíbe visitar sitios de recreación, tiendas, lugares de comidas rápidas, centros comerciales, cargando consigo los equipos electrónicos y de computación de la empresa.",
  "3. Se prohíbe dejar guardados los equipos electrónicos y de computación de la empresa, dentro de vehículos asignados o particulares, cuando estos se encuentren estacionado en la vía pública o aparcamientos generales.",
  "4. En caso de hurto de equipos electrónicos y de computación de la empresa en los sitios indicados en los numerales 2 y 3, la persona debe cancelar la totalidad del equipo de acuerdo al valor que tenga este establecido en el mercado (verificado por la Gerencia IT). ",
  "5. Ante una situación de pérdida ó hurto de equipos electrónicos y de computación, debe comunicarse inmediatamente con la unidad de PCP los cuales le orientaran sobre los pasos a seguir. La Jefatura de PCP determinará la cancelación o no del mismo basándose en las condiciones de la pérdida."
]
const NotaEntrega = ({ equipo, usuario, textConditional, note, apps }) => (
  //Configuración de la página
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Fecha */}
      <Image src={logo} style={styles.img} />
      <Text style={{ textAlign: 'right' }}>
        {`Barquisimeto, ${fecha.format('DD')} de ${fecha.format('MMMM')} del ${fecha.format('yyyy')}`}
      </Text>
      {/* Titulo */}
      <Text style={styles.titulo}>
        NOTA DE ENTREGA
      </Text>
      {/* Primer Parrafo */}
      <Text style={styles.parrafo}>
        Gerencia de IT por medio de la presente le hace entrega al Sr(a): {<Text style={{ ...styles.negrita, textDecorationStyle: 'underline black' }}>{usuario.nombre + " - " + usuario.cargo}</Text>} {textConditional}. El equipo cuenta con las siguientes características:
      </Text>
      <View style={styles.parrafo}>
        {
          // lista de caracteristicas del equipo 
          list.map((list) => {
            const value = equipo[list.id];
            return (
              <Text
                key={list.id}
                style={styles.item}>
                {`${list.name}: ${value}`}
              </Text>
            );
          })
        }
      </View>
     { note ? <Text style={{...styles.negrita, ...styles.parrafo}}>{`Observación: ${note}`}</Text> : null}
      {
        // lista de aplicaciones equipo
        apps.length > 0
          ?
          <>
            <Text style={styles.parrafo}>El equipo cuenta con los siguientes programas instalados:</Text>
            <View style={styles.lista}>
              {
                apps.map((app) => (
                  <Text
                    key={app}
                    style={styles.item}>
                    {`- ${app}`}
                  </Text>
                ))
              }
            </View>
          </>
          : null
      }
      <Text style={{ ...styles.parrafo, ...styles.negrita }}>
        Normas Corporativas para la protección de equipos electrónicos, sistemas de almacenamiento de datos y archivos:
      </Text>
      <View style={styles.lista}>
        {
          //lista normas
          normas.map((norma, index) => (<Text key={index} style={styles.item}>{norma}</Text>))
        }
      </View>
      <View style={styles.firma}>
      <View style={{width: '50%', marginRight: 60}}>
        <Text>Entrega:</Text>
        <Text style={{marginTop: 15}}>_____________________</Text>
      </View>
      <View style={{width: '50%'}}>
        <Text>Recibe conforme:</Text>
        <Text style={{marginTop: 15}}>_____________________</Text>
      </View>
      </View>
      <View style={styles.firma}>
        <View style={{width: '50%', marginRight: 60}}>
        <Text>{usuario.nombre}</Text>
        <Text>{usuario.cargo}</Text>
        <Text>Gerencia IT</Text>
        </View>
        <View style={{width: '50%', textAlign: 'left'}}>
        <Text>{usuario.nombre}</Text>
        <Text>CI:</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default NotaEntrega;