import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar_container}>
                    <Image className={styles.imagem} src={`/images/logo.png`} width="75" height="75" />
                    <ul className={styles.link_items}>
                        <li>
                            <Link className={styles.link} href={`/`}>Inicio</Link>
                        </li>
                        <li>
                            <Link className={styles.link} href={`/about`}>Serviços</Link>
                        </li>
                        <li>
                            <Link className={styles.link} href={`/about`}>Galeria</Link>
                        </li>
                        <li>
                            <Link className={styles.link} href={`/about`}>Localização</Link>
                        </li>
                        <li>
                            <Link className={styles.link} href={`/about`}>Agende seu horário</Link>
                        </li>
                    </ul>
                    <Link className={styles.btn} href={`/login/Signup`}>
                        <button className={styles.user_icon_button}>

                            <Image className={styles.imagem_user} src={`/images/user.png`} width="75" height="75" />
                        </button>
                    </Link>
                </div>
            </nav>
            <div className={styles.inf}>
                <div className={styles.left_container}>
                    <div className={styles.welcome}>
                        <div className={styles.titulo}>
                            <h2>DN BARBER SHOP</h2>
                            <hr />
                        </div>

                        <p>Seja bem-vindo à DN Barber Shop, onde a tradição encontra a modernidade para criar uma experiência única em cuidados masculinos. Localizada no coração da cidade, somos mais do que uma barbearia comum; somos o seu destino definitivo para o estilo e bem-estar.</p>
                        <button>Agende seu horário</button>
                    </div>
                    <div className={styles.imagem_container_1} />
                </div>
                <div className={styles.right_container}>
                    <div className={styles.imagem_container_2} />
                    <div className={styles.horarios_container}>
                        <div className={styles.titulo_2}>
                            <h2>NOSSOS HORÁRIOS</h2>
                            <hr />
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>SEGUNDA</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>TERÇA</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>QUARTA</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>QUINTA</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>SEXTA</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>SÁBADO</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                                <tr>
                                    <td>DOMINGO</td>
                                    <td>FECHADO</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
