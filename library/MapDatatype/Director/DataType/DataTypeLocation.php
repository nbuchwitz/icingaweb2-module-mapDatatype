<?php

namespace Icinga\Module\MapDatatype\Director\DataType;

use Icinga\Application\Icinga;
use Icinga\Module\Director\Hook\DataTypeHook;
use Icinga\Module\Director\Web\Form\QuickForm;

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

        return $element;
    }
}
