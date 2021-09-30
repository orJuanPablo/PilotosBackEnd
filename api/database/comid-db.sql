-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2021 a las 21:17:42
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comid-db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_evt_estado`
--

CREATE TABLE `cat_evt_estado` (
  `ces_id` int(11) NOT NULL,
  `ces_nombre` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_evt_tipos`
--

CREATE TABLE `cat_evt_tipos` (
  `cet_id` int(11) NOT NULL,
  `cet_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_localidades`
--

CREATE TABLE `cat_localidades` (
  `clo_id` int(11) NOT NULL,
  `clo_prov` int(11) NOT NULL,
  `clo_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_provincias`
--

CREATE TABLE `cat_provincias` (
  `cpr_id` int(11) NOT NULL,
  `cpr_nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_us_roles`
--

CREATE TABLE `cat_us_roles` (
  `cur_id` int(11) NOT NULL,
  `cur_nombre` varchar(5) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `evt_id` int(11) NOT NULL,
  `evt_tipo` int(11) NOT NULL,
  `evt_fec` int(11) NOT NULL,
  `evt_prov` int(11) NOT NULL,
  `evt_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `ins_id` int(11) NOT NULL,
  `ins_evt` int(11) NOT NULL,
  `ins_pil` int(11) NOT NULL,
  `ins_fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `ins_us` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pilotos`
--

CREATE TABLE `pilotos` (
  `pil_id` int(11) NOT NULL,
  `pil_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pil_apellido` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pil_dni` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `pil_fecNac` date NOT NULL,
  `pil_tel` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `pil_email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pil_prov` int(11) NOT NULL,
  `pil_loc` int(11) NOT NULL,
  `pil_dom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `us_id` int(11) NOT NULL,
  `us_username` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `us_password` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `us_salt` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `us_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `us_apellido` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `us_rol` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cat_evt_estado`
--
ALTER TABLE `cat_evt_estado`
  ADD PRIMARY KEY (`ces_id`);

--
-- Indices de la tabla `cat_evt_tipos`
--
ALTER TABLE `cat_evt_tipos`
  ADD PRIMARY KEY (`cet_id`);

--
-- Indices de la tabla `cat_localidades`
--
ALTER TABLE `cat_localidades`
  ADD PRIMARY KEY (`clo_id`);

--
-- Indices de la tabla `cat_provincias`
--
ALTER TABLE `cat_provincias`
  ADD PRIMARY KEY (`cpr_id`);

--
-- Indices de la tabla `cat_us_roles`
--
ALTER TABLE `cat_us_roles`
  ADD PRIMARY KEY (`cur_id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`evt_id`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`ins_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`us_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cat_evt_estado`
--
ALTER TABLE `cat_evt_estado`
  MODIFY `ces_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cat_evt_tipos`
--
ALTER TABLE `cat_evt_tipos`
  MODIFY `cet_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cat_localidades`
--
ALTER TABLE `cat_localidades`
  MODIFY `clo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cat_provincias`
--
ALTER TABLE `cat_provincias`
  MODIFY `cpr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cat_us_roles`
--
ALTER TABLE `cat_us_roles`
  MODIFY `cur_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `evt_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `ins_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
