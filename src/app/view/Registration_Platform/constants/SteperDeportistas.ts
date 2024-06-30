import { Validators } from "@angular/forms";
import { PAISES_LIST } from "src/app/utils/constants/PaisesList";
import { regExps } from "src/app/utils/Validators";
import { SteperDinamic } from "../../../utils/interface/SteperDinamic";

export const SteperDeportistas: SteperDinamic[] = [
    {
        error: 'required.',
        label: 'Informacion personal',
        controle: [
            { label: 'Nombre', placeholder: 'Enter Nombre ', controlName: 'Name', validators: [Validators.required], type: 'text' },
            { label: 'Apellido', placeholder: 'Enter Apellido', controlName: 'LastName', validators: [Validators.required], type: 'text' },
            { label: 'Fecha de nacimiento', placeholder: 'DD/MM/AAAA', controlName: 'Birthdate', validators: [Validators.required], type: 'picker' },
            { label: 'IWF (Abreviatura deel país o liga)  ', placeholder: 'Ej: COL', controlName: 'IwfCoiCode', validators: [Validators.required], type: 'select', list: PAISES_LIST }
        ]
    },
    {
        error: 'required.',
        label: 'Informacion competencia',
        controle: [
            { label: 'Número del atleta', placeholder: 'Enter Número', controlName: 'Numero_Sorteo', validators: [Validators.required, Validators.pattern(regExps['number'])], type: 'number' },
            { label: 'Intento de arranque', placeholder: 'Enter arranque', controlName: 'Primer_Arranque', validators: [Validators.required, Validators.pattern(regExps['number'])], type: 'number', suffix: 'Kg' },
            { label: 'Intento de envión ', placeholder: 'Enter envión', controlName: 'Primer_Envion', validators: [Validators.required, Validators.pattern(regExps['number'])], type: 'number', suffix: 'Kg' }
        ]
    }, {
        error: 'required.',
        label: 'Hecho',
        action: { label: 'Registrar deportista', type: 'button', action: 'submit' },
        message: '¡Termina el Registro!'
    }

]