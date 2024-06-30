import { Validators } from "@angular/forms";
import { SteperDinamic } from "../../../utils/interface/SteperDinamic";
export const SteperLevantamiento: SteperDinamic[] = [
    {
        error: 'required.',
        label: 'Juez 1',
        controle: [
            { label: 'Nombre completo', placeholder: 'Enter Nombre ', controlName: 'name', validators: [Validators.required], type: 'text' },
            { label: 'N.identificación', placeholder: 'Enter identificación', controlName: 'document', validators: [Validators.required], type: 'number' },
        ]
    },
    {
        error: 'required.',
        label: 'Juez 2',
        controle: [
            { label: 'Nombre completo', placeholder: 'Enter Nombre ', controlName: 'name', validators: [Validators.required], type: 'text' },
            { label: 'N.identificación', placeholder: 'Enter identificación', controlName: 'document', validators: [Validators.required], type: 'number' },
        ]
    },
    {
        error: 'required.',
        label: 'Juez 3',
        controle: [
            { label: 'Nombre completo', placeholder: 'Enter Nombre ', controlName: 'name', validators: [Validators.required], type: 'text' },
            { label: 'N.identificación', placeholder: 'Enter identificación', controlName: 'document', validators: [Validators.required], type: 'number' },
        ]
    }

]