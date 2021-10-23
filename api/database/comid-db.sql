-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2021 a las 03:10:22
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
  `ces_nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_evt_estado`
--

INSERT INTO `cat_evt_estado` (`ces_id`, `ces_nombre`) VALUES
(1, 'Inscribiendo'),
(2, 'Reportado'),
(3, 'Finalizado'),
(4, 'Cerrado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_evt_tipos`
--

CREATE TABLE `cat_evt_tipos` (
  `cet_id` int(11) NOT NULL,
  `cet_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_evt_tipos`
--

INSERT INTO `cat_evt_tipos` (`cet_id`, `cet_nombre`) VALUES
(1, 'Carrera Óvalo'),
(2, 'Enduro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_localidades`
--

CREATE TABLE `cat_localidades` (
  `clo_id` int(11) NOT NULL,
  `clo_prov` int(11) NOT NULL,
  `clo_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_localidades`
--

INSERT INTO `cat_localidades` (`clo_id`, `clo_prov`, `clo_nombre`) VALUES
(1, 1, 'Capital'),
(2, 1, 'Sanagasta'),
(3, 1, 'Aimogasta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_provincias`
--

CREATE TABLE `cat_provincias` (
  `cpr_id` int(11) NOT NULL,
  `cpr_nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_provincias`
--

INSERT INTO `cat_provincias` (`cpr_id`, `cpr_nombre`) VALUES
(1, 'La Rioja'),
(2, 'Catamarca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_us_roles`
--

CREATE TABLE `cat_us_roles` (
  `cur_id` int(11) NOT NULL,
  `cur_nombre` varchar(5) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_us_roles`
--

INSERT INTO `cat_us_roles` (`cur_id`, `cur_nombre`) VALUES
(1, 'user'),
(2, 'adm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `evt_id` int(11) NOT NULL,
  `evt_tipo` int(11) NOT NULL,
  `evt_pista` int(11) NOT NULL,
  `evt_fec` date NOT NULL,
  `evt_prov` int(11) NOT NULL,
  `evt_loc` int(11) NOT NULL,
  `evt_estado` int(11) NOT NULL,
  `evt_desc` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`evt_id`, `evt_tipo`, `evt_pista`, `evt_fec`, `evt_prov`, `evt_loc`, `evt_estado`, `evt_desc`) VALUES
(1, 1, 0, '2021-09-29', 1, 2, 1, ''),
(2, 2, 0, '2021-10-13', 1, 1, 1, '');

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

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`ins_id`, `ins_evt`, `ins_pil`, `ins_fecha`, `ins_us`) VALUES
(1, 1, 1, '2021-10-01 01:23:47', 2),
(2, 2, 12, '2021-10-03 21:50:24', 1),
(3, 0, 37, '2021-10-04 00:45:30', 1),
(4, 2, 9, '2021-10-16 14:24:55', 1),
(5, 1, 11, '2021-10-16 14:25:01', 1),
(6, 1, 17, '2021-10-16 14:25:08', 1),
(7, 1, 3, '2021-10-16 21:58:58', 1);

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
  `pil_dom` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pilotos`
--

INSERT INTO `pilotos` (`pil_id`, `pil_nombre`, `pil_apellido`, `pil_dni`, `pil_fecNac`, `pil_tel`, `pil_email`, `pil_prov`, `pil_loc`, `pil_dom`) VALUES
(1, 'Gilburt', 'Jeffray', '0937939722', '1984-01-27', '713-536-6123', 'gjeffray0@youtube.com', 1, 3, '094 Arizona Place'),
(2, 'Shaine', 'Karadzas', '7590499625', '2016-09-26', '174-432-4145', 'skaradzas1@mit.edu', 1, 2, '2 Spohn Court'),
(3, 'Christan', 'Hairsnape', '7995476469', '1992-10-13', '762-677-9136', 'chairsnape2@yale.edu', 1, 1, '18448 Spenser Circle'),
(4, 'Amity', 'MacCurtain', '0805846077', '1987-11-18', '215-121-3549', 'amaccurtain3@free.fr', 1, 2, '44 Trailsway Crossing'),
(5, 'Mollee', 'Swannick', '6509194449', '2014-02-12', '375-480-2957', 'mswannick4@youku.com', 1, 1, '54 Moose Place'),
(6, 'Anabelle', 'Levey', '0802778054', '2010-06-13', '884-936-6945', 'alevey5@biblegateway.com', 1, 2, '8574 Hoard Alley'),
(7, 'Willy', 'Zoren', '0157515494', '1983-12-15', '772-535-6420', 'wzoren6@ebay.co.uk', 1, 1, '3038 Corben Avenue'),
(8, 'Jeanie', 'Moring', '1181166462', '2018-02-05', '675-174-4773', 'jmoring7@vinaora.com', 1, 3, '25 Hauk Alley'),
(9, 'Elaina', 'Fleming', '1563904918', '2017-10-18', '881-869-3821', 'efleming8@fotki.com', 1, 1, '17 Village Green Hill'),
(10, 'Whitaker', 'Brotherhed', '0408228296', '2021-02-25', '669-533-9933', 'wbrotherhed9@reverbnation.com', 1, 2, '1606 Artisan Road'),
(11, 'Karole', 'Jean', '2704096546', '2012-10-31', '520-474-4428', 'kjeana@ehow.com', 1, 2, '6519 Rigney Point'),
(12, 'Anna', 'Rake', '6090234346', '1983-08-16', '986-789-9743', 'arakeb@state.tx.us', 1, 1, '07609 Waubesa Center'),
(13, 'Skipp', 'Fandrey', '0730953564', '2004-02-28', '898-779-6758', 'sfandreyc@cisco.com', 1, 3, '73946 7th Street'),
(14, 'Fan', 'Lanston', '5529547222', '1992-06-28', '618-636-9422', 'flanstond@devhub.com', 1, 1, '5 Hoffman Junction'),
(15, 'Germana', 'Duckers', '2194133828', '1992-02-01', '580-501-0586', 'gduckerse@chronoengine.com', 1, 2, '8988 Center Court'),
(16, 'Ardis', 'O\'Connel', '1567236812', '2009-05-08', '373-588-3728', 'aoconnelf@e-recht24.de', 1, 2, '9 Lyons Lane'),
(17, 'Eberto', 'Akid', '6766324589', '1992-01-05', '675-884-6511', 'eakidg@icq.com', 1, 1, '74 Sachs Crossing'),
(18, 'Arleen', 'McKellar', '4516915693', '1982-06-18', '652-999-8548', 'amckellarh@sogou.com', 1, 1, '14 Bowman Plaza'),
(19, 'Carolee', 'Carluccio', '5763775678', '2003-12-31', '252-371-4429', 'ccarluccioi@phpbb.com', 1, 1, '6753 Bluejay Crossing'),
(20, 'Arabela', 'Curry', '2503188281', '2013-08-05', '828-334-5386', 'acurryj@java.com', 1, 1, '9 Raven Park'),
(21, 'Andreana', 'Waddell', '3745417402', '1982-07-18', '175-485-4368', 'awaddellk@goodreads.com', 1, 3, '096 Loftsgordon Park'),
(22, 'Wallis', 'Beggi', '2723418693', '1988-12-05', '268-313-9125', 'wbeggil@tmall.com', 1, 3, '1966 Union Circle'),
(23, 'Matty', 'Trowel', '9750321766', '1995-12-22', '254-897-9084', 'mtrowelm@nbcnews.com', 1, 2, '09 Straubel Plaza'),
(24, 'Ram', 'Wurz', '1065164467', '2004-09-05', '536-390-0219', 'rwurzn@geocities.jp', 1, 1, '7001 Dixon Circle'),
(25, 'Christian', 'Howkins', '5558085134', '2007-12-01', '773-125-5727', 'chowkinso@amazon.co.jp', 1, 3, '8 Mosinee Place'),
(26, 'Audi', 'Crews', '8152946664', '1992-12-14', '193-299-4805', 'acrewsp@cocolog-nifty.com', 1, 1, '45 Crowley Way'),
(27, 'Ambros', 'Manicomb', '9404136190', '1995-08-07', '744-947-2598', 'amanicombq@hp.com', 1, 1, '53193 Reinke Road'),
(28, 'Bernie', 'Boal', '8410071452', '1983-12-29', '205-620-5643', 'bboalr@economist.com', 1, 2, '9147 Crest Line Center'),
(29, 'Rozamond', 'Pren', '4580146913', '2015-11-26', '269-220-0193', 'rprens@de.vu', 1, 1, '28122 Everett Point'),
(30, 'Selina', 'Hawlgarth', '3887431928', '2004-08-28', '287-680-5622', 'shawlgartht@etsy.com', 1, 2, '858 Lien Park'),
(31, 'ASD', 'ASD', '123456', '2016-09-20', '35456465231', 'asda@holasbjd.com', 1, 1, 'Amana 3643'),
(32, 'Juan Pablo', 'Rombolá', '123467245', '1996-08-19', '03804444881', 'juanp.ocampo.22@gmail.com', 1, 1, 'Amana 123'),
(33, 'Nahime', 'Gomez', '7383737920', '1995-03-22', '3804444766', 'Nahi@breti.com', 1, 1, 'Lejos lejos'),
(34, 'Maria', 'Rombolá', '20369845', '1975-05-09', '637567563', 'asdasd@gmail.com', 1, 3, 'Rio primero sin númer'),
(35, 'Pedro', 'Castillo', '1231321', '1991-09-29', '1234564', 'akjsd@kljasfj.com', 1, 2, 'jhksdñlghjk'),
(36, 'Leandro', 'Ocampo', '58693123', '1991-10-09', '03804444881', 'juanp.ocampo.22@gmail.com', 1, 1, 'Rio primero sin numero'),
(37, 'asdasd', 'asdasd', '21354632', '1996-09-23', '36988541', 'asdas@asdas.com', 1, 1, 'askjdj N° 12'),
(38, 'Carlos', 'Vilouta', '12457896', '1991-09-22', '458523698', 'asd@asd.com', 1, 2, 'asdmoa n° 19'),
(39, 'Hernan', 'Montivero', '45963852', '1999-07-15', '1234567897', 'asdas@asdas.com', 1, 2, 'calle sin nombre N° -'),
(40, 'Leandro Nicolás', 'Ocampo Rombolá', '12546987', '1997-10-09', '+54-380-4444881', 'juanp.ocampo.22@gmail.com', 1, 1, 'Calle Río Primero --'),
(41, 'asda', 'aaaaa', '15252564', '2001-09-10', '380445522', 'asdaklo@asda.com', 0, 0, 'asd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutores`
--

CREATE TABLE `tutores` (
  `tut_id` int(11) NOT NULL,
  `tut_pil` int(11) NOT NULL,
  `tut_paretesco` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tut_nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tut_apellido` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tut_dni` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tut_tel` varchar(20) COLLATE utf8_spanish_ci NOT NULL
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
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`us_id`, `us_username`, `us_password`, `us_salt`, `us_nombre`, `us_apellido`, `us_rol`) VALUES
(1, 'admin', 'HTAuB6H8JcoUo1IG7D0xBQ70uv/qtRgnJQUtfnQriL3WYxiF7jgRkyRDa60hqGT5kv/LkjXlWB0CCKKjznY25Q==', 'JGAtvStff3UZXjJfIGcuIA==', 'Juan Pablo', 'Ocampo Rombolá', 1),
(2, 'super', '58/2v9lN4sHVdB8hwjNNSa3ZeE2CM7xMWLnOjpaxlh4FmUL6UzdYyVmRP9/DoPpsbsMPS0giRL2krkHpN+iktg==', 'mDCali67sDet/M+5fk4vGA==', 'Juan Pablo', 'Ocampo Rombolá', 2);

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
-- Indices de la tabla `pilotos`
--
ALTER TABLE `pilotos`
  ADD PRIMARY KEY (`pil_id`);

--
-- Indices de la tabla `tutores`
--
ALTER TABLE `tutores`
  ADD PRIMARY KEY (`tut_id`);

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
  MODIFY `ces_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cat_evt_tipos`
--
ALTER TABLE `cat_evt_tipos`
  MODIFY `cet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat_localidades`
--
ALTER TABLE `cat_localidades`
  MODIFY `clo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cat_provincias`
--
ALTER TABLE `cat_provincias`
  MODIFY `cpr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat_us_roles`
--
ALTER TABLE `cat_us_roles`
  MODIFY `cur_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `evt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `ins_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pilotos`
--
ALTER TABLE `pilotos`
  MODIFY `pil_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `tutores`
--
ALTER TABLE `tutores`
  MODIFY `tut_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
