import moment, { Moment } from 'moment';

export class DateTimeUtil {
  private momentDate: Moment;

  constructor(dateTimeString: string) {
    this.momentDate = moment(dateTimeString);
  }

  /**
   * Obtiene la fecha formateada.
   * @param format - El formato deseado. Por defecto es 'YYYY-MM-DD'.
   * @returns La fecha formateada como una cadena.
   */
  getFormattedDate = (format: string = 'YYYY-MM-DD'): string => {
    return this.momentDate.format(format);
  };

  /**
   * Obtiene la hora formateada.
   * @param format - El formato deseado. Por defecto es 'HH:mm:ss'.
   * @returns La hora formateada como una cadena.
   */
  getFormattedTime = (format: string = 'HH:mm:ss'): string => {
    return this.momentDate.format(format);
  };

  /**
   * Obtiene el día de la semana.
   * @returns El nombre del día de la semana como una cadena.
   */
  getDayOfWeek = (): string => {
    return this.momentDate.format('dddd');
  };

  /**
   * Añade días a la fecha.
   * @param days - El número de días a añadir.
   * @returns La instancia actual de DateTimeUtil.
   */
  addDays = (days: number): DateTimeUtil => {
    this.momentDate.add(days, 'days');
    return this;
  };

  /**
   * Resta días a la fecha.
   * @param days - El número de días a restar.
   * @returns La instancia actual de DateTimeUtil.
   */
  subtractDays = (days: number): DateTimeUtil => {
    this.momentDate.subtract(days, 'days');
    return this;
  };

  /**
   * Calcula la diferencia en días con otra fecha.
   * @param otherDate - La otra fecha como una cadena.
   * @returns La diferencia en días como un número.
   */
  differenceInDays = (otherDate: string): number => {
    const otherMoment = moment(otherDate);
    return this.momentDate.diff(otherMoment, 'days');
  };

  /**
   * Calcula la diferencia en horas con otra fecha.
   * @param otherDate - La otra fecha como una cadena.
   * @returns La diferencia en horas como un número.
   */
  differenceInHours = (otherDate: string): number => {
    const otherMoment = moment(otherDate);
    return this.momentDate.diff(otherMoment, 'hours');
  };

  /**
   * Verifica si la fecha actual es antes de otra fecha.
   * @param otherDate - La otra fecha como una cadena.
   * @returns Verdadero si la fecha actual es antes de la otra fecha, falso de lo contrario.
   */
  isBefore = (otherDate: string): boolean => {
    const otherMoment = moment(otherDate);
    return this.momentDate.isBefore(otherMoment);
  };

  /**
   * Verifica si la fecha actual es después de otra fecha.
   * @param otherDate - La otra fecha como una cadena.
   * @returns Verdadero si la fecha actual es después de la otra fecha, falso de lo contrario.
   */
  isAfter = (otherDate: string): boolean => {
    const otherMoment = moment(otherDate);
    return this.momentDate.isAfter(otherMoment);
  };

  /**
   * Verifica si la fecha actual es la misma que otra fecha.
   * @param otherDate - La otra fecha como una cadena.
   * @returns Verdadero si la fecha actual es la misma que la otra fecha, falso de lo contrario.
   */
  isSame = (otherDate: string): boolean => {
    const otherMoment = moment(otherDate);
    return this.momentDate.isSame(otherMoment);
  };
}




