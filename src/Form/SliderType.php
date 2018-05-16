<?php

namespace App\Form;

use App\Entity\Slider;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SliderType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lib_slider', TextType::class, array("required" => true))
            ->add('min_slider', IntegerType::class, array("required" => true))
            ->add('max_slider', IntegerType::class, array("required" => true))
            ->add('unite_slider', TextType::class, array("required" => true))
            ->add('val_min_slider', IntegerType::class, array("required" => true))
            ->add('val_max_slider', IntegerType::class, array("required" => true))
            ->add('save', SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Slider::class,
        ]);
    }
}
