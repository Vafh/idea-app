import css from './index.module.scss'

const FormItems = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.formItems}>{children}</div>
}

export default FormItems
