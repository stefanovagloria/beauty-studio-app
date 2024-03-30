import styles from './Header.module.css';

const Header = () => {
    return(
        <div className={styles.container}>
            <div>Понеделник до Неделя : 09:00-19:00ч. БЕЗ ПОЧИВЕН ДЕН</div>
            <div>studio.nefertiti1@gmail.com</div>
            <div> 0894 791 917</div>
        </div>
    )
}

export default Header;