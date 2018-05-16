<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180429154854 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE objet_piece (id INT AUTO_INCREMENT NOT NULL, piece_id INT NOT NULL, objet_id INT NOT NULL, INDEX IDX_4BE8109EC40FCFA8 (piece_id), INDEX IDX_4BE8109EF520CF5A (objet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE objet_piece_ambiance (objet_piece_id INT NOT NULL, ambiance_id INT NOT NULL, INDEX IDX_F53BCDC375DF289A (objet_piece_id), INDEX IDX_F53BCDC337A05A93 (ambiance_id), PRIMARY KEY(objet_piece_id, ambiance_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE objet_piece ADD CONSTRAINT FK_4BE8109EC40FCFA8 FOREIGN KEY (piece_id) REFERENCES piece (id)');
        $this->addSql('ALTER TABLE objet_piece ADD CONSTRAINT FK_4BE8109EF520CF5A FOREIGN KEY (objet_id) REFERENCES objet (id)');
        $this->addSql('ALTER TABLE objet_piece_ambiance ADD CONSTRAINT FK_F53BCDC375DF289A FOREIGN KEY (objet_piece_id) REFERENCES objet_piece (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE objet_piece_ambiance ADD CONSTRAINT FK_F53BCDC337A05A93 FOREIGN KEY (ambiance_id) REFERENCES ambiance (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE ambiance_objet');
        $this->addSql('ALTER TABLE slider ADD val_min_slider INT NOT NULL, ADD val_max_slider INT NOT NULL, DROP val_slider, CHANGE unite_slider unite_slider VARCHAR(10) NOT NULL');
        $this->addSql('ALTER TABLE ambiance DROP FOREIGN KEY FK_F0C732FB3FB89930');
        $this->addSql('DROP INDEX IDX_F0C732FB3FB89930 ON ambiance');
        $this->addSql('ALTER TABLE ambiance CHANGE pieces_id piece_id INT NOT NULL');
        $this->addSql('ALTER TABLE ambiance ADD CONSTRAINT FK_F0C732FBC40FCFA8 FOREIGN KEY (piece_id) REFERENCES piece (id)');
        $this->addSql('CREATE INDEX IDX_F0C732FBC40FCFA8 ON ambiance (piece_id)');
        $this->addSql('ALTER TABLE programmation DROP FOREIGN KEY FK_5E9F80E3F520CF5A');
        $this->addSql('DROP INDEX IDX_5E9F80E3F520CF5A ON programmation');
        $this->addSql('ALTER TABLE programmation ADD attribut_objet_id INT NOT NULL, CHANGE objet_id objet_piece_id INT NOT NULL');
        $this->addSql('ALTER TABLE programmation ADD CONSTRAINT FK_5E9F80E375DF289A FOREIGN KEY (objet_piece_id) REFERENCES objet_piece (id)');
        $this->addSql('ALTER TABLE programmation ADD CONSTRAINT FK_5E9F80E3B1EB3DAF FOREIGN KEY (attribut_objet_id) REFERENCES attribut_objet (id)');
        $this->addSql('CREATE INDEX IDX_5E9F80E375DF289A ON programmation (objet_piece_id)');
        $this->addSql('CREATE INDEX IDX_5E9F80E3B1EB3DAF ON programmation (attribut_objet_id)');
        $this->addSql('ALTER TABLE attribut_objet CHANGE slider_id slider_id INT DEFAULT NULL, CHANGE etat_id etat_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE objet DROP FOREIGN KEY FK_46CD4C38C40FCFA8');
        $this->addSql('DROP INDEX IDX_46CD4C38C40FCFA8 ON objet');
        $this->addSql('ALTER TABLE objet CHANGE piece_id attribut_objet_id INT NOT NULL');
        $this->addSql('ALTER TABLE objet ADD CONSTRAINT FK_46CD4C38B1EB3DAF FOREIGN KEY (attribut_objet_id) REFERENCES attribut_objet (id)');
        $this->addSql('CREATE INDEX IDX_46CD4C38B1EB3DAF ON objet (attribut_objet_id)');
        $this->addSql('ALTER TABLE etat CHANGE val_slider val_slider TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE programmation DROP FOREIGN KEY FK_5E9F80E375DF289A');
        $this->addSql('ALTER TABLE objet_piece_ambiance DROP FOREIGN KEY FK_F53BCDC375DF289A');
        $this->addSql('CREATE TABLE ambiance_objet (id INT AUTO_INCREMENT NOT NULL, objet_id INT NOT NULL, ambiance_id INT NOT NULL, INDEX IDX_361F07F7F520CF5A (objet_id), INDEX IDX_361F07F737A05A93 (ambiance_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ambiance_objet ADD CONSTRAINT FK_361F07F737A05A93 FOREIGN KEY (ambiance_id) REFERENCES ambiance (id)');
        $this->addSql('ALTER TABLE ambiance_objet ADD CONSTRAINT FK_361F07F7F520CF5A FOREIGN KEY (objet_id) REFERENCES objet (id)');
        $this->addSql('DROP TABLE objet_piece');
        $this->addSql('DROP TABLE objet_piece_ambiance');
        $this->addSql('ALTER TABLE ambiance DROP FOREIGN KEY FK_F0C732FBC40FCFA8');
        $this->addSql('DROP INDEX IDX_F0C732FBC40FCFA8 ON ambiance');
        $this->addSql('ALTER TABLE ambiance CHANGE piece_id pieces_id INT NOT NULL');
        $this->addSql('ALTER TABLE ambiance ADD CONSTRAINT FK_F0C732FB3FB89930 FOREIGN KEY (pieces_id) REFERENCES piece (id)');
        $this->addSql('CREATE INDEX IDX_F0C732FB3FB89930 ON ambiance (pieces_id)');
        $this->addSql('ALTER TABLE attribut_objet CHANGE slider_id slider_id INT NOT NULL, CHANGE etat_id etat_id INT NOT NULL');
        $this->addSql('ALTER TABLE etat CHANGE val_slider val_slider VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE objet DROP FOREIGN KEY FK_46CD4C38B1EB3DAF');
        $this->addSql('DROP INDEX IDX_46CD4C38B1EB3DAF ON objet');
        $this->addSql('ALTER TABLE objet CHANGE attribut_objet_id piece_id INT NOT NULL');
        $this->addSql('ALTER TABLE objet ADD CONSTRAINT FK_46CD4C38C40FCFA8 FOREIGN KEY (piece_id) REFERENCES piece (id)');
        $this->addSql('CREATE INDEX IDX_46CD4C38C40FCFA8 ON objet (piece_id)');
        $this->addSql('ALTER TABLE programmation DROP FOREIGN KEY FK_5E9F80E3B1EB3DAF');
        $this->addSql('DROP INDEX IDX_5E9F80E375DF289A ON programmation');
        $this->addSql('DROP INDEX IDX_5E9F80E3B1EB3DAF ON programmation');
        $this->addSql('ALTER TABLE programmation ADD objet_id INT NOT NULL, DROP objet_piece_id, DROP attribut_objet_id');
        $this->addSql('ALTER TABLE programmation ADD CONSTRAINT FK_5E9F80E3F520CF5A FOREIGN KEY (objet_id) REFERENCES objet (id)');
        $this->addSql('CREATE INDEX IDX_5E9F80E3F520CF5A ON programmation (objet_id)');
        $this->addSql('ALTER TABLE slider ADD val_slider VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, DROP val_min_slider, DROP val_max_slider, CHANGE unite_slider unite_slider VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
