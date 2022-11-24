import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';

export default function Update({ item }) {
  const location = useHistory();

  // formik logics
  const formik = useFormik({
    initialValues: {
      caption: item?.caption,
      description: item?.description,
      year: dayjs(item?.expires).format('YYYY'),
      month: dayjs(item?.expires).format('MM'),
      day: dayjs(item?.expires).format('DD'),
      hour: dayjs(item?.expires).format('HH'),
      minute: dayjs(item?.expires).format('mm'),
      fileList: item?.fileList.join('\n')
    },
    validationSchema: Yup.object({
      caption: Yup.string().min(2, 'Мминимум 2 символа').max(128, 'Не более 128 символов').required('Введите заголовок'),
      description: Yup.string().max(512, 'Максимум 512 символов'),
      year: Yup.number().min(2000, 'минимум 2000 год').max(2100, 'максимум 2100 год').required('введите год'),
      month: Yup.number().min(1, 'месяц от 1 до 12').max(12, 'месяц от 1 до 12').required('введите месяц'),
      day: Yup.number().min(1, 'день от 1 до 31').max(31, 'день от 1 до 31').required('введите месяц'),
      hour: Yup.number().min(1, 'час от 1 до 24').max(24, 'час от 1 до 24').required('введите час'),
      minute: Yup.number().min(1, 'минуты от 1 до 60').max(60, 'минуты от 1 до 60').required('введите минуты'),
    }),
    onSubmit: (values) => {
      // if (typeof onSubmit === 'function') onSubmit(values);
      console.log(values);
    }
  })

  if (!item) {
    location.push('/');
  }

  return (
    <main className="edit">
      <h2 className="edit__caption">Редактирование</h2>
      <form name="edititem" className="form" noValidate>
        <label className="form__label" htmlFor="name">Заголовок</label>
        <input
          className={`form__input ${formik.touched.caption && formik.errors.caption && 'form__input_error'}`}
          type="text"
          name="caption"
          required
          minLength='2'
          maxLength='256'
          value={formik.values.caption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="form__error">{formik.touched.caption && formik.errors.caption}</p>

        <label className="form__label" htmlFor="name">Описание</label>
        <input
          className={`form__input ${formik.touched.description && formik.errors.description && 'form__input_error'}`}
          type="text"
          name="caption"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="form__error">{formik.touched.description && formik.errors.description}</p>

        <div className="form__date">
          <input
            className={`form__input form__input_small ${formik.touched.year && formik.errors.year && 'form__input_error'}`}
            type="number"
            name="year"
            placeholder="YYYY"
            min="2000"
            max="2100"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className={`form__input form__input_small ${formik.touched.month && formik.errors.month && 'form__input_error'}`}
            type="number"
            name="month"
            placeholder="MM"
            min="1"
            max="12"
            value={formik.values.month}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className={`form__input form__input_small ${formik.touched.day && formik.errors.day && 'form__input_error'}`}
            type="number"
            name="day"
            placeholder="DD"
            min="1"
            max="31"
            value={formik.values.day}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className={`form__input form__input_small ${formik.touched.hour && formik.errors.hour && 'form__input_error'}`}
            type="number"
            name="hour"
            placeholder="HH"
            min="1"
            max="24"
            value={formik.values.hour}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className={`form__input form__input_small ${formik.touched.minute && formik.errors.minute && 'form__input_error'}`}
            type="number"
            name="minute"
            placeholder="MM"
            min="1"
            max="60"
            value={formik.values.minute}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <label className="form__label" htmlFor="name">Список файлов</label>
        <textarea
          className={`form__input form__input_textarea`}
          name="fileList"
        />

        <button type="submit" className="form__submit form__submit_disabled">Сохранить</button>
      </form>
    </main>
  )
}
