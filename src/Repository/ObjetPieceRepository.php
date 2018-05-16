<?php

namespace App\Repository;

use App\Entity\ObjetPiece;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ObjetPiece|null find($id, $lockMode = null, $lockVersion = null)
 * @method ObjetPiece|null findOneBy(array $criteria, array $orderBy = null)
 * @method ObjetPiece[]    findAll()
 * @method ObjetPiece[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ObjetPieceRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ObjetPiece::class);
    }

//    /**
//     * @return ObjetPiece[] Returns an array of ObjetPiece objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ObjetPiece
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
