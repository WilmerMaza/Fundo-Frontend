import { columnsDinamic } from 'src/app/utils/interface/columnsDinamic';

export const TableRegisterAthlete: columnsDinamic[] = [
  {
    displayname: 'Nombre',
    name: 'Name',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Número',
    name: 'Numero_Sorteo',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Fecha de nacimiento',
    name: 'Birthdate',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'IWF',
    name: 'IwfCoiCode',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Itento arranque',
    name: 'Primer_Arranque',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Intento envión',
    name: 'Primer_Envion',
    estado: true,
    type: 'text',
  },
];

export const TableCompeticionAthlete: columnsDinamic[] = [
  {
    displayname: ' ',
    name: 'id',
    estado: true,
    type: 'text'
  },
  {
    displayname: 'Nombre',
    name: 'Name',
    estado: true,
    type: 'text', custom: true
  },
  {
    displayname: 'IWF',
    name: 'IwfCoiCode',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Arranque',
    name: 'Primer_Arranque',
    estado: true,
    colspan: 5,
    children: [
      { name: 'firstArranque', displayname: '1', estado: true, type: 'text' },
      { name: 'secondArranque', displayname: '2', estado: true, type: 'text' },
      { name: 'thirdArranque', displayname: '3', estado: true, type: 'text' },
      { name: 'totalArranque', displayname: 'Total', estado: true, type: 'text' },
      { name: 'lugarArranque', displayname: 'Lu', estado: true, type: 'text' },
    
    ],
    type: 'text',
  }, {
    displayname: 'Envión',
    name: 'Primer_Envion',
    estado: true,
    colspan: 5,
    children: [
      { name: 'firstEnvion', displayname: '1', estado: true, type: 'text' },
      { name: 'secondEnvion', displayname: '2', estado: true, type: 'text' },
      { name: 'thirdEnvion', displayname: '3', estado: true, type: 'text' },
      { name: 'totalEnvion', displayname: 'Total', estado: true, type: 'text' },
      { name: 'lugarEnvion', displayname: 'Lu', estado: true, type: 'text' },
     
    ],
    type: 'text',
  }
];

export const ColspanMejor: columnsDinamic = {
  displayname: 'Mejor',
  name: 'mejor',
  estado: true,
  colspan: 3,
  children: [
    { name: 'total', displayname: 'Total', estado: true, type: 'text' },
    { name: 'lugar', displayname: 'Lugar', estado: true, type: 'text' },
  ],
  type: 'text',

}