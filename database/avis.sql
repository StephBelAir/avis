-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 01 mai 2023 à 12:06
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `avis`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `email` varchar(30) NOT NULL,
  `pseudo` varchar(20) NOT NULL,
  `note` int(11) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `timestamp` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`email`, `pseudo`, `note`, `commentaire`, `photo`, `timestamp`) VALUES
('steph.bohler@gmail.com', 'S5', 5, '13245679', 'Array', 1682927691002),
('steph.bohler@gmail.com', 'S4', 4, '897654321', 'Array', 1682927716006),
('steph.bohler@gmail.com', 's3', 3, 'azrztgsd', 'Array', 1682927739428),
('steph.bohler@gmail.com', 's2', 2, 'azertyui', 'Array', 1682927766867),
('lola@aol.com', 'C2', 2, 'qsdfghjk', 'Array', 1682927793008),
('lola@aol.com', 'C1', 5, 'poiuytrezqdf', 'Array', 1682927813761),
('steph.bohler@gmail.com', 'Test relaod', 5, 'relaod', 'Array', 1682928016499),
('lola@aol.com', 'zadaz', 1, 'azaz', 'Array', 1682928055177),
('steph.bohler@gmail.com', 'test', 3, 'azertyu3', 'Array', 1682933313115),
('steph.bohler@gmail.com', 'aze', 1, 'aazrazrz', 'Array', 1682935022357);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
