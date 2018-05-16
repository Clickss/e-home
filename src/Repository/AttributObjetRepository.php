<?php

namespace App\Repository;

use App\Entity\AttributObjet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method AttributObjet|null find($id, $lockMode = null, $lockVersion = null)
 * @method AttributObjet|null findOneBy(array $criteria, array $orderBy = null)
 * @method AttributObjet[]    findAll()
 * @method AttributObjet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AttributObjetRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, AttributObjet::class);
    }

//    /**
//     * @return AttributObjet[] Returns an array of AttributObjet objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AttributObjet
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
