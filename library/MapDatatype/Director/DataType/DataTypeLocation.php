<?php

namespace Icinga\Module\MapDatatype\Director\DataType;

use Icinga\Module\Director\Hook\DataTypeHook;
use Icinga\Module\Director\Web\Form\QuickForm;
use Icinga\Application\Icinga;

//use Zend_Form;
//use Icinga\Module\Map\Director\Form_Element_Time;
//use Icinga\Module\Map\Director\ValueFilter\FilterLocation;

class DataTypeLocation extends DataTypeHook
{
    /**
     * @param $name
     * @param QuickForm|DirectorObjectForm $form
     *
     * @return \Zend_Form_Element
     */
    public function getFormElement($name, QuickForm $form)
    {

        $module = Icinga::app()
            ->getModuleManager()
            ->loadModule('mapDatatype')
            ->getModule('mapDatatype');

        $form->addPrefixPathsForModule($module);
        //$form->addPrefixPath('Icinga\\Module\\Map\\',)

        $element = $form->createElement('Location', $name);

//        $element = $form->createElement('text', $name)
//            ->addValidator('Regex', true,
//                array(
//                    'pattern' => '/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/',
//                    'messages' => array(
//                        'regexNotMatch' => t('Invalid coordinate format. Has to be: <latitude>,<longitude>')
//                    )
//                ))
//            ->addFilter(new FilterLocation());

        return $element;
    }
}
