<?php

namespace Icinga\Module\MapDatatype\Director\DataType;

use Icinga\Module\Director\Hook\DataTypeHook;
use Icinga\Module\Director\Web\Form\QuickForm;
use Icinga\Application\Icinga;

class DataTypeLocation extends DataTypeHook
{
    /**
     * @param $name
     * @param QuickForm|DirectorObjectForm $form
     *
     * @return \Zend_Form_Element
     * @throws \Icinga\Exception\ProgrammingError
     * @throws \Zend_Form_Exception
     */
    public function getFormElement($name, QuickForm $form)
    {
        $placeholder = $this->getPlaceholder($name, $form);
        $module = Icinga::app()
            ->getModuleManager()
            ->loadModule('mapDatatype')
            ->getModule('mapDatatype');

        $form->addPrefixPathsForModule($module);

        $element = $form->createElement('Location', $name)->setAttribs(array(
            'placeholder-custom' => $placeholder
        ));

        return $element;
    }

    private function getPlaceholder($name, $form)
    {
        $placeholder = '';
        $var = $this->adjustVarName($name);
        if (($value = $form->getObject()->getResolvedVar($var)) !== null) {
            $placeholder = $value . ' - ' . t('inherited');
        }
        return $placeholder;
    }

    private function adjustVarName($name)
    {
        $prefix = 'var_';
        if (substr($name, 0, strlen($prefix)) == $prefix) {
            $name = substr($name, strlen($prefix));
        }
        return $name;
    }
}
