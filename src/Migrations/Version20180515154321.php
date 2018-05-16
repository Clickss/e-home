<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180515154321 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE valeurs_objet (id INT AUTO_INCREMENT NOT NULL, objetpiece_id INT DEFAULT NULL, val_etat TINYINT(1) DEFAULT NULL, val_min_slider INT DEFAULT NULL, val_max_slider INT DEFAULT NULL, UNIQUE INDEX UNIQ_3F64D5B16B4938EE (objetpiece_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE valeurs_objet ADD CONSTRAINT FK_3F64D5B16B4938EE FOREIGN KEY (objetpiece_id) REFERENCES objet_piece (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE valeurs_objet');
    }
}
